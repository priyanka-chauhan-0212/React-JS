import React, { PureComponent, Fragment } from 'react';
import { Button, Row, Col } from 'reactstrap';
import _map from 'lodash/map';

import Colors from '../../container/design/Colors';
import { DesktopPreview, EmailDetails, Tabs, Emoji } from './Styled';
import { SURVEY_METHOD } from '../../container/constants/commonConstants';

import AddIconToLibrary from '../../container/utils/fontAwesomeIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
AddIconToLibrary([faTimes]);

class Preview extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toggle = () => {
    this.setState((prevState) => ({
      overlay: !prevState.overlay,
    }));
  };

  activeTabToggle = (activeTab) => {
    this.setState({
      activeTab,
    });
  };

  getContrastYIQ = (hexcolor) => {
    hexcolor = hexcolor.replace('#', '');
    var r = parseInt(hexcolor.substr(0, 2), 16);
    var g = parseInt(hexcolor.substr(2, 2), 16);
    var b = parseInt(hexcolor.substr(4, 2), 16);
    var yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? 'black' : 'white';
  };

  render() {
    const {
      title,
      description,
      color,
      iconColor,
      textColor,
      transparent,
      radius,
      question,
      surveyType,
      surveyMethod,
      from,
      to,
      skip_comment,
      subject,
    } = this.props;
    return (
      <Fragment>
        <Tabs>
          <div
            className="tab active"
            onClick={() => this.activeTabToggle(1)}
          >
            Preview
          </div>
        </Tabs>
        {surveyMethod === SURVEY_METHOD.EMAIL && (
          <EmailDetails>
            <div className="table-container">
              <table>
                <tbody>
                  <tr>
                    <td className="from">From</td>
                    <td>{from}</td>
                  </tr>
                  <tr>
                    <td className="from">
                      Reply to
                    </td>
                    <td>{to}</td>
                  </tr>
                  <tr>
                    <td className="from">
                      Subject
                    </td>
                    <td>{subject}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </EmailDetails>
        )}
        <DesktopPreview>
          <div className="header">
            <div className="left" />
            <div className="left" />
            <div className="border" />
          </div>
          <div className="desktop-modal">
            <div className="view-card">
              <div className="name">
                {title
                  ? title
                  : 'On a scale between 1-10, how likely are you to recommend The NPS to a friend or collegue?'}
              </div>
              {surveyMethod === SURVEY_METHOD.EMAIL ? (
                <div className="description">
                  {question
                    ? question
                    : 'How likely are you to recommend Test to a friend?.'}
                </div>
              ) : (
                <div className="description">
                  {description
                    ? description
                    : 'Your feedback is important to us. The NPS user this feedback to improve our service and provide a richer experience for our account holders.'}
                </div>
              )}
              {surveyType === 'standard' && (
                <Fragment>
                  <div className="rating">
                    {_map(
                      Array(10),
                      (list, index) => (
                        <div
                          className="number"
                          key={index}
                          style={{
                            background:
                              transparent
                                ? color
                                : Colors.Transparent,
                            color: transparent
                              ? this.getContrastYIQ(
                                color
                              )
                              : 'black',
                            border: '1px solid',
                            borderColor:
                              color,
                            borderRadius:
                              radius ===
                                1
                                ? '5px'
                                : radius ===
                                  2
                                  ? 0
                                  : '50%',
                          }}
                        >
                          {index + 1}
                        </div>
                      )
                    )}
                  </div>
                  <div className="like">
                    <div className="not-likely">
                      Not Likely
                    </div>
                    <div className="not-likely">
                      Very Likely
                    </div>
                  </div>
                </Fragment>
              )}
              {surveyType === 'simple' && (
                <Row>
                  <Col>
                    <Emoji
                      className="emoji-card"
                      icon={iconColor}
                      text={textColor}
                    >
                      <FontAwesomeIcon
                        icon={[
                          'fas',
                          'praying-hands',
                        ]}
                      />
                      <div className="emoji-text">
                        Enough
                      </div>
                    </Emoji>
                  </Col>
                  <Col>
                    <Emoji
                      className="emoji-card"
                      icon={iconColor}
                      text={textColor}
                    >
                      <FontAwesomeIcon
                        icon={[
                          'fas',
                          'thumbs-up',
                        ]}
                      />
                      <div className="emoji-text">
                        Great
                      </div>
                    </Emoji>
                  </Col>
                  <Col>
                    <Emoji
                      className="emoji-card"
                      icon={iconColor}
                      text={textColor}
                    >
                      <FontAwesomeIcon
                        icon={[
                          'fas',
                          'hand-peace',
                        ]}
                      />
                      <div className="emoji-text">
                        Good
                      </div>
                    </Emoji>
                  </Col>
                  <Col>
                    <Emoji
                      className="emoji-card"
                      icon={iconColor}
                      text={textColor}
                    >
                      <FontAwesomeIcon
                        icon={[
                          'fas',
                          'grin-hearts',
                        ]}
                      />
                      <div className="emoji-text">
                        I love it
                      </div>
                    </Emoji>
                  </Col>
                </Row>
              )}
              {surveyType === 'modern' && (
                <Fragment>
                  <div className="rating-m">
                    <div
                      className="number"
                      style={{
                        background:
                          transparent
                            ? color
                            : Colors.Container,
                        color: transparent
                          ? this.getContrastYIQ(
                            color
                          )
                          : 'black',
                        border: '1px solid',
                        borderColor: color,
                        borderRadius:
                          radius === 1
                            ? '5px'
                            : radius ===
                              2
                              ? 0
                              : '50%',
                      }}
                    >
                      0
                    </div>
                    <div className="line" />
                    <div className="line" />
                    <div className="line" />
                    <div
                      className="number"
                      style={{
                        background:
                          transparent
                            ? color
                            : Colors.Container,
                        color: transparent
                          ? this.getContrastYIQ(
                            color
                          )
                          : 'black',
                        border: '1px solid',
                        borderColor: color,
                        borderRadius:
                          radius === 1
                            ? '5px'
                            : radius ===
                              2
                              ? 0
                              : '50%',
                      }}
                    >
                      4
                    </div>
                    <div className="line" />
                    <div className="line" />
                    <div className="line" />
                    <div className="line" />
                    <div className="line" />
                    <div
                      className="number color100"
                      style={{
                        background:
                          transparent
                            ? color
                            : Colors.Container,
                        color: transparent
                          ? this.getContrastYIQ(
                            color
                          )
                          : 'black',
                        border: '1px solid',
                        borderColor: color,
                        borderRadius:
                          radius === 1
                            ? '5px'
                            : radius ===
                              2
                              ? 0
                              : '50%',
                      }}
                    >
                      10
                    </div>
                  </div>
                  <div className="dropdown-divider new" />
                  <div className="like">
                    <div className="not-likely">
                      Not Likely
                    </div>
                    <div className="not-likely">
                      Very Likely
                    </div>
                  </div>
                </Fragment>
              )}
              {surveyMethod !== SURVEY_METHOD.EMAIL ? (
                <Fragment>
                  <div className="dropdown-divider" />
                  {skip_comment ? (
                    <></>
                  ) : (
                    <>
                      <div className="comment-text">
                        {question
                          ? question
                          : 'What about The NPS do you like? please comment below'}
                      </div>


                      <div className="box" /></>
                  )}
                  <div className="buttons">
                    <Button
                      color="primary"
                      onClick={this.redirect}
                      className="send"
                    >
                      Send feedback
                    </Button>
                  </div>
                </Fragment>
              ) : (
                <div className="divider" />
              )}
            </div>
          </div>
        </DesktopPreview>
      </Fragment>
    );
  }
}

export default Preview;
