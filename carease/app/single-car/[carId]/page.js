import { connect } from '@/dbconfig/dbconfig';
import Car from '@/models/car';
import SingleCarClient from '@/components/SingleCarClient';

export const revalidate = 0; // Ensures data is always fresh

const page = async ({ params }) => {
  await connect();
  const id = params.carId;

  // Fetch the car directly from the database
  const carData = await Car.findById(id);
  
  // Serialize the Mongoose document to a plain JSON object to pass to the Client Component
  const car = carData ? JSON.parse(JSON.stringify(carData)) : null;

  return (
    <SingleCarClient car={car} carId={id} />
  );
};

export default page;
