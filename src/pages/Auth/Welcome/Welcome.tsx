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
              <CardTitle className="h4">Switches</CardTitle>
              <p className="card-title-desc">
                A switch has the markup of a custom checkbox but uses the <code>.form-switch</code> class to render a
                toggle switch. Switches also support the <code>disabled</code> attribute.
              </p>
              <Row>
                <Col sm={6}>
                  <div>
                    <h5 className="font-size-14 mb-3">Switch examples</h5>
                    <div className="form-check form-switch mb-3">
                      <input type="checkbox" className="form-check-input" id="customSwitch1" />
                      <label className="form-check-label" htmlFor="customSwitch1">
                        Default switch checkbox input
                      </label>
                    </div>
                    <div className="form-check form-switch mb-3">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="customSwitch2"
                        defaultChecked
                        // onClick={(e) => {
                        // 	settoggleSwitch(!toggleSwitch);
                        // }}
                      />
                      <label className="form-check-label" htmlFor="customSwitch2">
                        Checked switch checkbox input
                      </label>
                    </div>
                  </div>
                  <div className="form-check form-switch mb-3">
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDisabled" disabled />
                    <label className="form-check-label" htmlFor="flexSwitchCheckDisabled">
                      Disabled switch checkbox input
                    </label>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckCheckedDisabled"
                      checked
                      disabled
                    />
                    <label className="form-check-label" htmlFor="flexSwitchCheckCheckedDisabled">
                      Disabled checked switch checkbox input
                    </label>
                  </div>
                </Col>

                <Col sm={6}>
                  <div className="mt-4 mt-lg-0">
                    <h5 className="font-size-14 mb-3">Switch sizes</h5>

                    <div className="form-check form-switch mb-3">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="customSwitchsizesm"
                        defaultChecked
                        // onClick={() => {
                        //   this.setState({
                        //     toggleSwitchSize: !this.state
                        //       .toggleSwitchSize,
                        //   })
                        // }}
                        // onClick={(e) => {
                        // 	settoggleSwitchSize(!toggleSwitchSize);
                        // }}
                      />
                      <label className="form-check-label" htmlFor="customSwitchsizesm">
                        Small Size Switch
                      </label>
                    </div>

                    <div className="form-check form-switch form-switch-md mb-3">
                      <input type="checkbox" className="form-check-input" id="customSwitchsizemd" />
                      <label className="form-check-label" htmlFor="customSwitchsizemd">
                        Medium Size Switch
                      </label>
                    </div>

                    <div className="form-check form-switch form-switch-lg mb-3">
                      <input type="checkbox" className="form-check-input" id="customSwitchsizelg" defaultChecked />
                      <label className="form-check-label" htmlFor="customSwitchsizelg">
                        Large Size Switch
                      </label>
                    </div>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Welcome;
