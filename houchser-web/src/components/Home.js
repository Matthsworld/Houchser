import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../store/servicesSlice';
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.services.services);
  const serviceStatus = useSelector((state) => state.services.status);
  const error = useSelector((state) => state.services.error);

  useEffect(() => {
    if (serviceStatus === 'idle') {
      dispatch(fetchServices());
    }
  }, [serviceStatus, dispatch]);

  return (
    <div>
      <h1>Houchser</h1>
      <Link to="/booking">Book a Service</Link>
      {serviceStatus === 'loading' && <div>Loading...</div>}
      {serviceStatus === 'failed' && <div>{error}</div>}
      {serviceStatus === 'succeeded' && (
        <ul>
          {services.map((service) => (
            <li key={service._id}>{service.type}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;

