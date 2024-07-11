import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import Button from '../Button';
import ThumbImage from '../ThumbImage';
import Title from '../Title';
import DefaultCar from '../../assets/images/car.jpg';

import { useToggle } from '../../shared/hooks';
import { Modal, ModalCardDetail } from '../Modal';

import { getCarData, getLocationData } from '../../shared/utils/utils';

import { removeFromFavorites, setToFavorites } from '../../redux/cars/carsSlice';

import { selectFavorites } from '../../redux/cars/carsSelectors';

import CardInfoBlock from './CardInfoBlock';
