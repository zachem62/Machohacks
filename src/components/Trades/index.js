import React, { Component } from 'react';
import { Link } from 'react-router';

import TradeRequest from '../TradeRequest/index';
import ProposedTrade from '../ProposedTrade/index';
import AddItemPage from '../AddItemPage/index';
import userData from "./../../assets/data/users.json"
import './styles.sass';

class Trades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpened: false,
      buy_items: [],
      sell_items: []
    };
  }

  componentDidMount() {
    document.body.scrollTop = 0;
    document.querySelector('.menu').classList.remove('open');
    for (var ind in userData['users']) {
      var user = userData.users[ind];
      if (user.id === this.props.params.id) {
        this.setState({buy_items: {...this.state,buy_items: user.buy_items}});
        this.setState({sell_items: {...this.state,sell_items: user.sell_items}});
        console.log("buyitem" + user.buy_items);
        console.log("buyitem" + this.state.buy_items);
      }
    }
  }

  closeModal() {
    this.setState({ modalOpened: false });
    document.body.classList.remove('modal-opened');
    document.body.style.marginRight = 0;
  }

  getAllProposedTrades() {
    return ([
      <ProposedTrade key="1" />,
      <ProposedTrade key="2" />
    ]);
  }

  getAllTradeRequests() {
    return ([
      <TradeRequest key="1" />,
      <TradeRequest key="2" />
    ]);
  }

  getModal() {
    if (this.state.modalOpened) {
      return <AddItemPage key="modal" openClass="open" close={this.closeModal.bind(this)} />;
    } else {
      return;
    }
  }

  openModal() {
    const scrollBar = document.querySelector('.scrollbar-measure');
    const scrollBarWidth = scrollBar.offsetWidth - scrollBar.clientWidth;
    document.body.classList.add('modal-opened');
    document.body.style.marginRight = `${scrollBarWidth}px`;
    this.setState({ modalOpened: true });
  }

  render() {
    return (
      <div className="tradesWrapper">
        {this.getModal()}
        <div className="addTradeWrapper">
          <Link to="myItems"><button className="tradeBtn allItemsBtn">My Items</button></Link>
          <button
            onClick={() => {
              this.openModal();
            }}
            className="tradeBtn addItemBtn">
            + Add Item
          </button>
        </div>
        <div className="tradesInfoWrapper">
          <div className="tradeReqWrapper">
            <h3 className="unCap">Trade Requests</h3>
            <div className="allTradeRequestsWrapper">
              {this.getAllTradeRequests()}
            </div>
          </div>
          <div className="tradeProposedWrapper">
            <h3 className="unCap">Trades Proposed</h3>
            <div className="allProposedTradesWrapper">
              {this.getAllProposedTrades()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Trades;
