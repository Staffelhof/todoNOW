import PropTypes from 'prop-types';

const taskShape = () => ({
  id: PropTypes.number,
  name: PropTypes.string,
  text: PropTypes.string,
  isCompleted: PropTypes.number,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
});

export default taskShape;
