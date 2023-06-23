import PropTypes from 'prop-types';

const taskShape = () => ({
  id: PropTypes.string,
  name: PropTypes.string,
  text: PropTypes.string,
  isCompleted: PropTypes.string,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
});

export default taskShape;
