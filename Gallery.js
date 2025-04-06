// components/Gallery.js
import Image from 'next/image';

const Gallery = () => {
  return (
    <section className="gallery">
      <div className="frame frame_bg">
        <div className="frame__content">
          <Image className="frame-media" src="/images/Frame 8.png" alt="Frame 8" width={300} height={300} />
        </div>
      </div>
      <div className="frame"></div>
      <div className="frame frame_bg">
        <div className="frame__content">
          <Image className="frame-media" src="/images/Frame 11.png" alt="Frame 11" width={300} height={300} />
        </div>
      </div>
      <div className="frame"></div>
      <div className="frame"></div>
      <div className="frame frame_bg">
        <div className="frame__content">
          <Image className="frame-media" src="/images/Frame 9.png" alt="Frame 9" width={300} height={300} />
        </div>
      </div>
      <div className="frame"></div>
      <div className="frame"></div>
      <div className="frame frame_bg">
        <div className="frame__content">
          <Image className="frame-media" src="/images/Frame 10.png" alt="Frame 10" width={300} height={300} />
        </div>
      </div>
      <div className="frame"></div>
      <div className="frame"></div>
      <div className="frame frame_bg">
        <div className="frame__content">
          <Image className="frame-media" src="/images/Frame 12.png" alt="Frame 12" width={300} height={300} />
        </div>
      </div>
      <div className="frame"></div>
      <div className="frame"></div>
      <div className="frame frame_bg">
        <div className="frame__content">
          <video className="frame-mediavd" src="/media/end.mp4" autoPlay loop muted></video>
        </div>
      </div>
      <div className="frame frame_bg">
        <div className="frame__content">Спасибо Thanks</div>
      </div>
    </section>
  );
};

export default Gallery;
