import React from 'react';
import PropTypes from 'prop-types';


const ArrowSort = ({sortByKey, keyId, sort, text}) => {

  return (
    <div onClick={sortByKey(keyId)}>
      {text}
        <i
          className={sort.order===2 ? 'fa fa-long-arrow-up' : 'fa fa-long-arrow-down'}
          style={{visibility: keyId===sort.key  ? 'visible' : 'hidden' }} />
    </div>
  );
};

ArrowSort.propTypes = {
  sortByKey: PropTypes.func.isRequired,
  keyId: PropTypes.string.isRequired,
  sort: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,

};

export default ArrowSort;
