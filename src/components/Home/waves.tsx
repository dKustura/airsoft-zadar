import * as React from 'react';

interface Props {}

const Waves: React.FC<Props> = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
    <path
      fill="#29ABE2"
      fill-opacity="1"
      d="M0,192L60,186.7C120,181,240,171,360,138.7C480,107,600,53,720,64C840,75,960,149,1080,160C1200,171,1320,117,1380,90.7L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
    ></path>
  </svg>
);

export default Waves;
