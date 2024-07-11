import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import Button from '../Button';
import ThumbImage from '../ThumbImage';
import Title from '../Title';
import DefaultCar from '../../assets/images/car.jpg';

import { useToggle } from '../../shared/hooks';
import { Modal, ModalCardDetail } from '../Modal';