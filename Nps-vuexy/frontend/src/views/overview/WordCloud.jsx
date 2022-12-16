import React, { PureComponent, useEffect, useState } from 'react';
import WordCloud from 'react-d3-cloud';
import { EMPTY_ARRAY } from '../../container/constants/commonConstants';
import moment from 'moment'; // imported moment for date formatting
import LoadingImage from '../../container/assets/loading.gif';
import NoDataImage from '../../container/assets/noData.png';
import { useHistory } from 'react-router-dom';

import { commonWords } from './CommonWords'; // imported commonWord Array from commonwords file


const WordCloudWrapper = (props) => {
  const history = useHistory()
  const { startDate, endDate, allKeywords } = props
  const [state, setState] = useState({
    loading: false,
    keys: EMPTY_ARRAY
  })

  useEffect(() => {

    console.log("word cloud use effect", allKeywords);
    setWordData()
  }, [allKeywords])

  const setWordData = () => {
    const { keywords, allKeywords, startDate, endDate, topKeywords
    } = props;



    let data = EMPTY_ARRAY;
    let startDateWord = startDate && moment(startDate).format('YYYY-MM-DD'); // converting startDate into YYYY-MM-DD format
    let endDateWord = endDate && moment(endDate).format('YYYY-MM-DD'); // converting endDate into YYYY-MM-DD format


    // checking word-data between start date and end date
    // if (allKeywords && startDateWord && endDateWord) {
    //   allKeywords.forEach(ele => {
    //     let date = moment(ele.created_at).format('YYYY-MM-DD');



    //     if (date >= startDateWord && date <= endDateWord) {

    //       data = [
    //         ...data,
    //         { text: ele.word, value: parseInt(ele.count * 500), id: ele.id },
    //       ];
    //     }
    //   });
    // } else if (allKeywords) {
    //   allKeywords.forEach(ele => {
    //     data = [...data, { text: ele.word, value: parseInt(ele.count * 500), id: ele.id }];
    //   });
    // }

    if (topKeywords) {

      topKeywords.map((word) => (
        data = [...data, { text: word.word, value: parseInt(word.count * 500), id: word.id }]
      ))


      // for (let [key, value] of Object.entries(topKeywords)) {
      //   console.log("topKeywords", topKeywords);
      //   data = [...data, { text: key, value: parseInt(value * 500) }];
      // }
    }

    // filtering data and removing commonwords from commonWords file
    const filteredData = data.filter(
      word => !commonWords.includes(word.text.toLowerCase()),
    );

    setState({
      ...state,
      keys: filteredData.slice(0, 20), // using slice method to show only 20 data
    });


  }

  // const setWordData = () => {
  //   const { keywords, allKeywords, startDate, endDate, topKeywords
  //   } = props;


  //   let data = EMPTY_ARRAY;
  //   let startDateWord = startDate && moment(startDate).format('YYYY-MM-DD'); // converting startDate into YYYY-MM-DD format
  //   let endDateWord = endDate && moment(endDate).format('YYYY-MM-DD'); // converting endDate into YYYY-MM-DD format


  //   // checking word-data between start date and end date
  //   if (allKeywords && startDateWord && endDateWord) {
  //     allKeywords.forEach(ele => {
  //       let date = moment(ele.createdAt).format('YYYY-MM-DD');



  //       if (date >= startDateWord && date <= endDateWord) {

  //         console.log("loop data word", ele);

  //         data = [
  //           ...data,
  //           { text: ele.word, value: parseInt(ele.count * 500), id: ele.id },
  //         ];
  //       }
  //     });
  //   } else if (allKeywords) {
  //     allKeywords.forEach(ele => {
  //       data = [...data, { text: ele.word, value: parseInt(ele.count * 500), id: ele.id }];
  //     });
  //   }

  //   // if (topKeywords) {

  //   //   topKeywords.map((word) => (
  //   //     data = [...data, { text: word.word, value: parseInt(word.count * 500) }]
  //   //   ))


  //   //   // for (let [key, value] of Object.entries(topKeywords)) {
  //   //   //   console.log("topKeywords", topKeywords);
  //   //   //   data = [...data, { text: key, value: parseInt(value * 500) }];
  //   //   // }
  //   // }

  //   // filtering data and removing commonwords from commonWords file
  //   const filteredData = data.filter(
  //     word => !commonWords.includes(word.text.toLowerCase()),
  //   );

  //   setState({
  //     ...state,
  //     keys: filteredData.slice(0, 20), // using slice method to show only 20 data
  //   });
  // }


  // console.log("props word", props);
  const fontSize = word => word.value / 15;
  return (
    <div className="word">
      {state.loading ? (
        <img
          src={LoadingImage}
          alt="loading"
          style={{ height: '50px', marginTop: '90px' }}
        />
      ) : state.keys.length < 1 ? (
        <img src={NoDataImage} alt="loading" />
      ) : (
        <WordCloud


          data={state.keys}
          font="sans-serif"
          fontSize={fontSize}
          padding={6}

          onWordClick={(event, d) => {
            let url = `/feedback?keywordId=${ d.id }`
            history.push(url)
          }}
          rotate={0}
        />
      )}
    </div>
  )
}

export default WordCloudWrapper