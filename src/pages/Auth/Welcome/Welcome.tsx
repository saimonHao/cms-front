import React from 'react';
import MetaTags from 'react-meta-tags';
import classes from './Welcome.module.scss';
import { RouteChildrenProps } from 'react-router-dom';
import Breadcrumb from 'components/Common/Breadcrumb';
import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap';

import locales from 'locales';

const Welcome = (props: RouteChildrenProps): JSX.Element => {
  console.log(props);
  return (
    <div className="page-content">
      <MetaTags>
        <title>{locales.title}</title>
      </MetaTags>
      <Breadcrumb title="Dashboard" breadcrumbItem="Welcome" />
      <div className={classes.el}>{locales.welcome}</div>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
             
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Welcome;
