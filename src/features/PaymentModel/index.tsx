import React, { useState, useEffect } from 'react';

type Props = {};

const PaymentModel = (props: Props): JSX.Element => {
  return (
    <div>
      <h1>Payment Model</h1>
      <div style={{ display: 'flex', flexFlow: 'column ' }}>
        <div>
          <label>
            <pre>{JSON.stringify(null, null, 2)}</pre>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PaymentModel;
