import { FC, useEffect, useRef } from "react";
import css from "../../../assets/scss/modules/PostList.module.scss";

interface PreviewImgProps {
  img: string;
  i: number;
  length: number;
  fillArr: (ref: any) => void;
  removePreviewImg: (i: number) => void;
}

const PreviewImg: FC<PreviewImgProps> = (props) => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;
    props.fillArr(imgRef.current);
    // eslint-disable-next-line
  }, [imgRef]);

  return (
    <div className={css.previewImgItem}>
      <img
        src={props.img}
        alt={`preview-img-${props.i + 1}`}
        key={props.i}
        ref={imgRef}
        className={
          props.length < 2
            ? css.previewImageOne
            : props.length === 2
            ? css.previewImageTwo
            : css.previewImageMore
        }
      />
      <div
        className={css.removePreviewImg}
        onClick={() => props.removePreviewImg(props.i)}
      >
        <span className={css.removePreviewImgBtn}>&times;</span>
      </div>
    </div>
  );
};

export default PreviewImg;
