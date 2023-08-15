import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

interface PropsSpinner {
  animation?: "border" | "grow";
  variant?: string;
  size?: string;
}

function LoadingSpinner({ animation="grow", variant="light"}: PropsSpinner) {
  return ( <>
    <Spinner animation={animation} variant={variant} size='sm'/>{' '}
    <Spinner animation={animation} variant={variant} size='sm'/>{' '}
    <Spinner animation={animation} variant={variant} size='sm'/>
  </>);
}

export default LoadingSpinner;