// pages/index.js
import Gallery from '../components/Gallery';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Gallery />
      <div className="sound-buttons">
        <img className="soundbutton paused" src="/images/player.png" alt="Player" />
        <img className="soundbutton-left paused" src="/images/mesage.png" alt="Message" />
      </div>
      <audio className="audio" src="/media/ambient.mp3" loop></audio>
    </div>
  );
}
