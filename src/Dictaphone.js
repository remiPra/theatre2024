import React, { useState } from 'react';

function TranscriptComparator({ original, transcript }) {

  const phrase = "hello les mais et bienvenue au théatre"
  const phrase1 = "hello les amis et bienvenue au théare"
  const [comparison, setComparison] = useState([]);

  const createWordObjects = (sentence) => {
    return sentence.split(/\s+/).map((word, index) => ({ word, position: index }));
  };

  const compareTranscripts = () => {
    const originalWords = createWordObjects(phrase);
    const transcriptWords = createWordObjects(phrase1);

    const comparisonResult = originalWords.map((originalWordObj, index) => {
      const transcriptWordObj = transcriptWords[index] || {};
      return {
        ...originalWordObj,
        correct: originalWordObj.word.toLowerCase() === transcriptWordObj.word.toLowerCase(),
      };
    });

    setComparison(comparisonResult);
  };

  return (
    <div>
      <button onClick={compareTranscripts}>Compare Transcripts</button>
      <div>
        {comparison.map((wordObj, index) => (
          <span key={index} style={{ color: wordObj.correct ? 'green' : 'red' }}>
            {wordObj.word}{' '}
          </span>
        ))}
      </div>
    </div>
  );
}

export default TranscriptComparator;
