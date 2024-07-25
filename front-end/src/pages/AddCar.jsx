import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm, Controller } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../utilis';

const schema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }).min(1, { message: 'Name is required' }),
  imageURL: z.string({
    required_error: 'Image is required',
  }).min(1, { message: 'Image is required' }).url({ message: "Invalid url" }),
  description: z.string({
    required_error: 'Description is required',
  }).min(1, { message: 'Description is required' }),
  current_location: z.string({
    required_error: 'Location is required',
  }).min(1, { message: 'Location is required' }),
  cost: z.string({
    required_error: 'Rent/price is required',
  }).min(1, { message: 'Price is required' }),
});

function AddCar() {

  const { handleSubmit, control, formState } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      current_location: '',
      cost: '',
      imageUrl: '',
      description: ''
    }
  });

  console.log(formState.errors);

  const onSubmit = async (values) => {
    try {
      await fetch(`${BASE_URL}/cars`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...values,
          cost: Number(values.cost)
        }),
      }).then((res) => res.json())
        .then(data => console.log(data))
        .catch((err) => console.log(err));
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Name" {...field} />
              {fieldState.invalid && (
                <Form.Text className="text-danger">
                  {fieldState.error.message}
                </Form.Text>
              )}
            </Form.Group>
          )}
        />
        <Controller
          name="current_location"
          control={control}
          render={({ field, fieldState }) => (
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" placeholder="Location" {...field} />
              {fieldState.invalid && (
                <Form.Text className="text-danger">
                  {fieldState.error.message}
                </Form.Text>
              )}
            </Form.Group>
          )}
        />
        <Controller
          name="cost"
          control={control}
          render={({ field, fieldState }) => (
            <Form.Group className="mb-3">
              <Form.Label>Cost</Form.Label>
              <Form.Control type="number" placeholder="Enter rent" {...field} />
              {fieldState.invalid && (
                <Form.Text className="text-danger">
                  {fieldState.error.message}
                </Form.Text>
              )}
            </Form.Group>
          )}
        />
        <Controller
          name="imageURL"
          control={control}
          render={({ field, fieldState }) => (
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="url" placeholder="Image URL" {...field} />
              {fieldState.invalid && (
                <Form.Text className="text-danger">
                  {fieldState.error.message}
                </Form.Text>
              )}
            </Form.Group>
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field, fieldState }) => (
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" placeholder="Description" {...field} />
              {fieldState.invalid && (
                <Form.Text className="text-danger">
                  {fieldState.error.message}
                </Form.Text>
              )}
            </Form.Group>
          )}
        />
        <Button
          variant="primary"
          type="submit"
          disabled={formState.isSubmitting}
        >
          {formState.isSubmitting ? "Saving..." : "Submit"}
        </Button>
      </Form>
    </Container>
  );
}

export default AddCar;
