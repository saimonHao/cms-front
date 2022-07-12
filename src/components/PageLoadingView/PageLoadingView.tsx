import React from 'react';
import { Spinner } from 'reactstrap';
import './PageLoadingView.scss';

const PageLoadingView = (props)=> {
  let { noPadding } = props;
  let style :any = {
    textAlign: 'center',
    paddingTop: noPadding ? 0 : 200,
    paddingBottom: noPadding ? 0 : 200,
    fontSize: 20
  };
  //type="grow"
  return (
    <div style={style}>
      <Spinner style={{ width: '5rem', height: '5rem' }} color="primary" />
      <div>{props.message ? props.message : 'Loading'}</div>
    </div>
  );
};
export default PageLoadingView;
