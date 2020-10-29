import React, { useEffect, useState } from 'react';
import BottleCardStyles from './BottleCardStyles';
import { Line } from 'react-chartjs-2';
import { makeGet, makePost } from '../../../Shared/Utils/request';
import Modal from 'react-modal';
import { UpdateContentsModal } from './UpdateContentsModal';

Modal.setAppElement('#root');

export const BottleCard = props => {
  const [editName, setEditName] = useState(false);
  const [cardName, setCardName] = useState(props.bottle.name);
  const [products, setProducts] = useState([]);

  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    makeGet('/products/fill', setProducts);
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = e => {
    e.stopPropagation();
    setIsOpen(false);
  };

  const modalStyles = {
    content: {
      borderRadius: '15px',
    },
  };

  const updateCardSettings = () => {
    makePost('/bottles/' + props.bottle._id + '/rename', { name: cardName });
  };

  var graphData = [];
  var labels = [];
  props.bottle.dailyAverages.forEach(average => {
    graphData.push(average.percent);
    labels.push(new Date(average.date).toISOString().split('T')[0]);
  });

  var data = {
    labels: labels,
    datasets: [
      {
        fill: true,
        backgroundColor: '#0c96f9',
        borderColor: '#0c96f9',
        data: graphData,
      },
    ],
  };
  return (
    <div className='card'>
      <BottleCardStyles />
      <div className='card_data'>
        <div className='card_title'>
          {editName ? (
            <div className='title_div'>
              <input
                placeholder={cardName}
                value={cardName}
                onChange={e => setCardName(e.target.value)}
              />
              <button
                title='Save'
                variant='contained'
                onClick={() => {
                  setEditName(false);
                  updateCardSettings();
                }}
              >
                Save
              </button>
              <button
                title='Cancel'
                variant='contained'
                onClick={() => {
                  setEditName(false);
                  setCardName(props.bottle.name);
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className='flex'>
              <div className='title_div'>{cardName}</div>
              <div className='edit_pen'>
                <button onClick={() => setEditName(true)}>Edit</button>
              </div>
            </div>
          )}
        </div>
        <ul>
          <li>Battery Remaining: {props.bottle.batteryPercent}</li>
          <li>Contents: {props.bottle.contentsName}</li>
          <li>Refill Product: {props.bottle.refillContentsName}</li>
          <div>
            <button onClick={() => openModal()}>Change Refill Product</button>
          </div>
        </ul>
      </div>

      <div className='card_graph'>
        <Line
          data={data}
          options={{
            legend: { display: false },
            tooltips: {
              enabled: true,
              xPadding: 35,
              yPadding: 25,
            },
            scales: {
              yAxes: [
                {
                  display: true,
                  ticks: {
                    min: 0,
                    steps: 10,
                    max: 100,
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Percent Full',
                  },
                },
              ],
              xAxes: [
                {
                  ticks: {
                    callback: function (label, index, labels) {
                      return null;
                    },
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Last ' + graphData.length + ' Days',
                  },
                },
              ],
            },
          }}
        />
      </div>
      <div className='card_stats'></div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <UpdateContentsModal
          bottle={props.bottle}
          products={products}
          closeModal={closeModal}
          updateBottles={props.updateBottles}
        />
      </Modal>
    </div>
  );
};
