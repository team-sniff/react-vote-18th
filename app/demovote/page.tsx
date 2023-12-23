'use client';
import React, { useState } from 'react';
import VoteItem from '@/components/vote/VoteItem';
import HoveringButton from '@/components/common/HoveringButton';
import axios from 'axios';

const VOTE_ITEMS = [
  { team: '스니프', description: '향수', count: 0 },
  { team: '레디', description: '레퍼런스', count: 0 },
  { team: '갓챠', description: '면접관리', count: 0 },
  { team: '로컬무드', description: '맛집리뷰', count: 0 },
  { team: '셰어마인드', description: '연애상담', count: 0 },
];

const Page = () => {
  const [selected, setSelected] = useState('');

  const handleVote = async () => {
    const selectedVoteItem = VOTE_ITEMS.find((item) => item.team === selected);

    if (!selectedVoteItem) {
      console.error('No selection made');
      return;
    }

    try {
      const response = await axios.post('/api/v1/demoday/votes', {
        teamName: selectedVoteItem.team,
      });

      console.log('투표 성공:', response.data);
    } catch (error) {
      console.error('투표 실패:', error);
    }
  };

  return (
    <div className="p-8">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-6">데모데이 투표</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {VOTE_ITEMS.map((item, index) => (
            <VoteItem
              key={index}
              team={item.team}
              name={item.description}
              selected={selected === item.team}
              onChange={() => setSelected(item.team)}
              isPart={true}
            />
          ))}
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <HoveringButton
          handleClickButton={handleVote}
          buttonStyle="w-[100px] h-[60px] mt-4 md:w-[200px]"
        >
          투표하기
        </HoveringButton>
      </div>
    </div>
  );
};

export default Page;