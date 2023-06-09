import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useFormik, FormikHelpers } from 'formik';
import { getPlayerExerciseById, updatePlayerExerciseById } from 'apiSdk/player-exercises';
import { Error } from 'components/error';
import { playerExerciseValidationSchema } from 'validationSchema/player-exercises';
import { PlayerExerciseInterface } from 'interfaces/player-exercise';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { PlayerInterface } from 'interfaces/player';
import { ExerciseInterface } from 'interfaces/exercise';
import { getPlayers } from 'apiSdk/players';
import { getExercises } from 'apiSdk/exercises';

function PlayerExerciseEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<PlayerExerciseInterface>(
    () => (id ? `/player-exercises/${id}` : null),
    () => getPlayerExerciseById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: PlayerExerciseInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updatePlayerExerciseById(id, values);
      mutate(updated);
      resetForm();
      router.push('/player-exercises');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<PlayerExerciseInterface>({
    initialValues: data,
    validationSchema: playerExerciseValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Player Exercise
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="goal" mb="4" isInvalid={!!formik.errors?.goal}>
              <FormLabel>Goal</FormLabel>
              <Input type="text" name="goal" value={formik.values?.goal} onChange={formik.handleChange} />
              {formik.errors.goal && <FormErrorMessage>{formik.errors?.goal}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<PlayerInterface>
              formik={formik}
              name={'player_id'}
              label={'Select Player'}
              placeholder={'Select Player'}
              fetcher={getPlayers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.position as string}
                </option>
              )}
            />
            <AsyncSelect<ExerciseInterface>
              formik={formik}
              name={'exercise_id'}
              label={'Select Exercise'}
              placeholder={'Select Exercise'}
              fetcher={getExercises}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name as string}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'player_exercise',
  operation: AccessOperationEnum.UPDATE,
})(PlayerExerciseEditPage);
