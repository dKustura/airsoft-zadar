// Member images
import member1 from './members/member1.jpg';
import member2 from './members/member2.jpg';
import member3 from './members/member3.jpg';
import member4 from './members/member4.jpg';
import member5 from './members/member5.jpg';
import member6 from './members/member6.jpg';
import member7 from './members/member7.jpg';
import teamImage from './members/team.jpeg';

// Background images
import bag from './background/bag.svg';
import cape from './background/cape.svg';
import flag from './background/flag.svg';
import horse from './background/horse.svg';
import pistol from './background/pistol.svg';
import rifle from './background/rifle.svg';
import shield from './background/shield.svg';
import logo from './background/logo.svg';

export const memberImages = {
  dino: member1,
  ivan: member2,
  denis: member3,
  toni: member4,
  leon: member5,
  karlo: member6,
  antonela: member7,
};

export const backgroundImages: '*.svg'[] = [
  bag,
  cape,
  flag,
  horse,
  pistol,
  rifle,
  shield,
  logo,
];

export const getRandomBackgroundImage = () => {
  return backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
};

export const getRandomArrayOfBackgroundImages = (numberOfImages: number) => {
  const result: '*.svg'[] = [];
  for (let imageIndex = 0; imageIndex < numberOfImages; imageIndex++) {
    const image = getRandomBackgroundImage();
    result.push(image);
  }
  return result;
};

export const team = teamImage;
