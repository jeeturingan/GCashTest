import React, { useEffect, useState } from 'react';
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
  IconTypes,
  IconAngle,
  IconSize,
  IconButton,
  Button,
  ButtonKind,
} from 'modus-ui';

import styles from './styles.module.scss';
import { getAdyenConfig, getPaymentMethods } from '../../api/checkout';
import { Link } from 'react-router-dom';

type Props = {};

export type productModel = {
  name: string;
  description: string;
  price: number;
};

const ProductCart = (props: Props): JSX.Element => {
  const [paymentMethods, setPaymentMethods] = useState();

  useEffect(() => {
    getAdyenConfig();
    getPaymentMethods()
      .then((Response) => {
        setPaymentMethods(Response.data.paymentMethods);
      })
      .catch((Error) => console.log(Error));
  }, []);

  const productsInCart: Array<productModel> = [
    { name: 'Product #1', description: 'Description #1', price: 1000 },
    { name: 'Product #2', description: 'Description #2', price: 2000 },
    { name: 'Product #3', description: 'Description #3', price: 3000 },
  ];

  let totalPrice = 0;

  return (
    <div>
      <h3>Product Cart</h3>
      <div style={{ display: 'flex', flexFlow: 'column ' }}>
        <div className={styles.container}>
          <Table
            isLoading={false}
            height={'50vh'}
            header={
              <TableHead>
                <TableHeader maxWidth="120px" label="Product Name" />
                <TableHeader label="Description" />
                <TableHeader align="right" maxWidth="200px" label="Price" />
              </TableHead>
            }
            rows={[
              productsInCart.map(
                (data, index): JSX.Element => {
                  totalPrice += data.price;
                  return (
                    <TableRow key={`${index}`}>
                      <TableCell>{data.name}</TableCell>
                      <TableCell>{data.description}</TableCell>
                      <TableCell align="right">₱ {data.price}</TableCell>
                    </TableRow>
                  );
                }
              ),
              <TableRow key={`${productsInCart.length}`}>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell align="right">Total: ₱ {totalPrice}</TableCell>
              </TableRow>,
            ]}
          />
        </div>
        <div>
          <Link to="/payment">
            <Button text="Checkout" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
