import React from 'react';
import './AboutMe.css';

export default function AboutMe() {
  return (
    <div className="creators-page">
      <h1 className="title-aboutus">Creators of Restaurant Roulette</h1>
      <section className="about-me">
        <h2 className="name">Jace</h2>
        <img className="img-aboutus" src={`${process.env.PUBLIC_URL}/images/jace.jpg`} />
        <p>
          My name is Jace Keyes. I like to swing dance and play video games in my free time. I am
          currently a software engineer in training.
        </p>
      </section>
      <section className="about-me">
        <h2 className="name">Andy</h2>
        <img className="img-aboutus" src={`${process.env.PUBLIC_URL}/images/andy.jpeg`} />
        <p>
          My name is Andy Mascaro. I have three kids and enjoy going to the beach with them. I am
          currently a software engineer in training.
        </p>
      </section>
      <section className="about-me">
        <h2 className="name">Denver</h2>
        <img className="img-aboutus" src={`${process.env.PUBLIC_URL}/images/denver.jpg`} />
        <p>
          My name is Denver, I am a big advocate for peanut butter and jelly sandwiches. I am a
          software engineer in training
        </p>
      </section>
      <section className="about-me">
        <h2 className="name">Cole</h2>
        <img className="img-aboutus" src={`${process.env.PUBLIC_URL}/images/cole.jpg`} />
        <p>My name is Cole Rossman, I am from Portland, OR and I am a software engineer in training. My favorite food is sushi and I love to hike.</p>
      </section>
      <section className="about-me">
        <h2 className="name">Yovana</h2>
        <img className="img-aboutus" src={`${process.env.PUBLIC_URL}/images/yovana.jpg`} />
        <p>
          My name is Yovana Pelayo. I enjoy kayaking, camping and eating great food! I am a Full
          Stack engineer.
        </p>
      </section>
    </div>
  );
}
