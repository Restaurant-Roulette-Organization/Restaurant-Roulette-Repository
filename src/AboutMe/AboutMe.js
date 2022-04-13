import React from 'react';
import './AboutMe.css';

export default function AboutMe() {
  return (
    <div className="creators-page">
      Creators of Restaurant Roulette
      <section className="about-me">
        <h2 className="name">Jace</h2>
        <img src={`${process.env.PUBLIC_URL}/images/jace.jpg`} />
        <p>
          My name is Jace Keyes. I like to swing dance and play video games in my free time. I am
          currently a software engineer in training.
        </p>
      </section>
      <section className="about-me">
        <h2 className="name">Andy</h2>
        <img src={`${process.env.PUBLIC_URL}/images/andy.jpeg`} />
        <p>
          My name is Andy Mascaro. I have three kids and enjoy going to the beach with them. I am
          old. I am currently a software engineer in training.
        </p>
      </section>
      <section className="about-me">
        <h2 className="name">Denver</h2>
        <img src={`${process.env.PUBLIC_URL}/images/denver.jpg`} />
        <p>
          My name is Denver, I am a big advocate for sleep. I am a software engineer in training
        </p>
      </section>
      <section className="about-me">
        <h2 className="name">Cole</h2>
        <img src={`${process.env.PUBLIC_URL}/images/cole.jpg`} />
        <p>caught a vibe</p>
      </section>
      <section className="about-me">
        <h2 className="name">Yovana</h2>
        <img src={`${process.env.PUBLIC_URL}/images/yovana.jpg`} />
        <p>
          My name is Yovana Pelayo. I enjoy kayaking, camping and eating great food! I am a Full
          Stack engineer.
        </p>
      </section>
    </div>
  );
}
