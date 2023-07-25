/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const App = () => {
  const [cards, setCards] = useState([]); //  섞인 카드를 저장
  const [flipped, setFlipped] = useState([]); // 현재 뒤집힌 카드의 인덱스를 저장 (최대 2개까지)
  const [solved, setSolved] = useState([]); // 맞춘 카드의 인덱스를 저장
  const [disabled, setDisabled] = useState(false); // 두 장의 카드를 비교 중일 때 다른 카드 클릭을 막기
  const [isWaiting, setIsWaiting] = useState(false); // 2초 동안 대기 상태인지 여부
  const [moves, setMoves] = useState(0); // 게임 시도 횟수를 저장
  const [totalPairs, setTotalPairs] = useState(4); // 게임에서 사용할 카드 쌍의 총 개수
  const [isGameStarted, setIsGameStarted] = useState(false); // 게임 시작 여부

  const [isCardFlipped, setIsCardFlipped] = useState([]); // 각 카드가 뒤집혀 있는지 여부ㅜ(카드 개수만큼의 길이를 가짐)

  // 카드를 클릭했을 때 호출되는 함수
  const handleCardClick = (index) => {
    // 이미 두 장의 카드를 뒤집은 경우, 기다리는 상태인 경우
    // 또는 이미 맞춘 카드를 클릭한 경우 아무 일도 일어나지 않도록 함
    if (disabled || isWaiting || solved.includes(index)) {
      return;
    }

    // 클릭한 카드를 뒤집기 위해 상태 업데이트
    setFlipped((prevFlipped) => [...prevFlipped, index]);
    setIsCardFlipped((prevIsCardFlipped) => {
      const newIsCardFlipped = [...prevIsCardFlipped];
      newIsCardFlipped[index] = true;
      return newIsCardFlipped;
    });

    // 두 장의 카드를 뒤집은 경우
    if (flipped.length === 1) {
      const [firstIndex] = flipped;
      const [secondIndex] = [index];

      // 두 장의 카드가 숫자가 같을 경우, 맞춘 상태로 처리
      if (cards[firstIndex] === cards[secondIndex]) {
        setSolved((prevSolved) => [...prevSolved, firstIndex, secondIndex]);
        setFlipped([]); // 두 장의 카드를 맞췄으므로 flipped 상태를 초기화해줌
      } else {
        // 두 장의 카드가 숫자가 다를 경우, 2초 동안 뒤집은 상태를 유지하고 다시 뒤집음
        setDisabled(true);
        setIsWaiting(true); // 2초 동안 기다리는 상태로 설정
        setTimeout(() => {
          setIsCardFlipped((prevIsCardFlipped) => {
            const newIsCardFlipped = [...prevIsCardFlipped];
            newIsCardFlipped[firstIndex] = false;
            newIsCardFlipped[secondIndex] = false;
            setDisabled(false);
            return newIsCardFlipped;
          });
          setIsWaiting(false); // 기다리는 상태 해제
          setFlipped([]); // 두 장의 카드를 다시 뒤집으므로 flipped 상태를 초기화해줌
        }, 2000); // 2초 대기
      }

      setMoves((moves) => moves + 1);
    }
  };

  // 카드 섞기 함수
  function shuffle(array) {
    return array.slice().sort(() => Math.random() - 0.5);
  }

  // 게임 시작 함수
  const startGame = (numPairs) => {
    setTotalPairs(numPairs); // 카드 개수 설정

    const nums = Array.from({ length: numPairs }, (_, index) => index + 1); // 숫자 배열 생성
    const shuffledCards = shuffle([...nums, ...nums]); // 해당 숫자 배열을 두 배로 늘려서 카드를 섞은 배열을 생성

    setCards(shuffledCards); // 섞인 카드 배열을 상태로 설정하여 섞인 카드를 저장
    setFlipped([]); // 뒤집은 카드의 인덱스를 저장하는 배열 새탕
    setSolved([]); // 맞춘 카드의 인덱스를 저장하는 배열 세팅
    setMoves(0); // 게임 시도 횟수
    setIsGameStarted(true); // 게임 시작
    setIsCardFlipped(Array(shuffledCards.length).fill(false)); // 카드들이 뒤집혀 있지 않은 상태로 초기화
  };

  // 모든 카드를 맞추면 축하 메시지 띄우기
  useEffect(() => {
    if (solved.length === totalPairs * 2) {
      setTimeout(() => {
        setIsGameStarted(false);
        alert(`축하합니다. 무려 ${moves}번 만에 게임을 끝내셨군요!`);
      }, 500);
    }
  }, [solved, totalPairs, moves]);

  return (
    <>
      <GlobalStyle />
      <CardGameContainer>
        <h1>카드 뒤집기 게임</h1>
        {!isGameStarted ? (
          <>
            <p>카드의 쌍을 입력하세요 (최대 20쌍 제한)</p>
            <input
              type="number"
              min="2"
              max="20"
              value={totalPairs}
              onChange={(e) => setTotalPairs(parseInt(e.target.value))}
            />
            <button onClick={() => startGame(totalPairs)}>게임 시작</button>
          </>
        ) : (
          <>
            <div>
              <p>남은 쌍의 카드: {totalPairs - solved.length / 2}</p>
              <p>총 시도 횟수: {moves}</p>
            </div>
            <Board>
              {cards.map((card, index) => (
                <Card
                  key={index}
                  isSolved={solved.includes(index)}
                  onClick={() => handleCardClick(index)}
                  // 카드 뒤집힘 상태에 따라서 클래스 네임 설정
                  className={`${isCardFlipped[index] ? 'flipped' : ''}`}
                >
                  <CardInner>
                    {/* 카드 맞춘 상태에 따라서 회전 */}
                    <CardFront
                      style={{
                        transform: isCardFlipped[index]
                          ? 'rotateY(180deg)'
                          : 'rotateY(0)',
                      }}
                    >
                      {isCardFlipped[index] ? card : '카드 뒤집기'}
                    </CardFront>
                    <CardBack
                      style={{
                        transform: isCardFlipped[index]
                          ? 'rotateY(0)'
                          : 'rotateY(-180deg)',
                      }}
                    >
                      {card}
                    </CardBack>
                  </CardInner>
                </Card>
              ))}
            </Board>
          </>
        )}
      </CardGameContainer>
    </>
  );
};

export default App;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
 
  }
`;

const CardGameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Board = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 500px;
`;

const flipDuration = '0.5s';

const Card = styled.div`
  width: 100px; /* Set the desired fixed width */
  height: 150px; /* Set the desired fixed height */
  border: 2px solid #333;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  background-color: ${({ isSolved }) => (isSolved ? 'transparent' : '#f0f0f0')};
  perspective: 1000px;
  margin: 5px;
  visibility: ${({ isSolved }) => (isSolved ? 'hidden' : 'visible')};
  transition:
    background-color 0.3s,
    visibility 0.3s;
`;

const CardFront = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transition: transform ${flipDuration};
`;

const CardBack = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  background-color: darkslateblue;
  color: white;
  transition: transform ${flipDuration};
`;

const CardInner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 8px;
`;

const Congratulations = styled.div`
  margin-top: 20px;
  text-align: center;
`;
