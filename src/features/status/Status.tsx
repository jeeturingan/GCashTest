import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { Button } from 'modus-ui';

export const Message = ({ type, reason }: any) => {
  let msg, result;
  switch (type) {
    case 'pending':
      msg = (
        <span>Your order has been received! Payment completion pending.</span>
      );
      result = 'Success';
      break;
    case 'failed':
      msg = (
        <span>
          The payment was refused. Please try a different payment method or
          card.
        </span>
      );
      result = 'Failed';
      break;
    case 'error':
      msg = (
        <span>
          Error! Reason: {reason || 'Internal error'}, refer to&nbsp;
          <a href="https://docs.adyen.com/development-resources/response-handling">
            Response handling.
          </a>
        </span>
      );
      result = 'Failed';
      break;
    default:
      msg = <span>Your order has been successfully placed.</span>;
      result = 'Success';
  }

  return (
    <>
      <h1>{result}</h1>
      <h3>{msg}</h3>
    </>
  );
};

export function Status() {
  let { type } = useParams();
  let query = new URLSearchParams(useLocation().search);
  let reason = query ? query.get('reason') : '';

  return (
    <div className="status-container">
      <div className="status">
        <Message type={type} reason={reason} />
        <Link to="/">
          <Button text="Return Home" />
        </Link>
      </div>
    </div>
  );
}
