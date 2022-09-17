import {useEffect, useState} from 'react';
import Head                  from 'next/head';
import Image                 from 'next/image';
import styles                from '../styles/Home.module.scss';
import logo                  from '../assets/imgs/Logo.svg';
import QuestionIcon          from '../assets/imgs/Question_Icon.svg';
import arrow                 from '../assets/imgs/Arrow.svg';
import arrowUpdate           from '../assets/imgs/ArrowOutline.svg';
import {Collapse, Tooltip}   from 'antd';
import cls                   from 'classnames';
import Input                 from '../components/Input';
import {generateRandomColor} from '../helpers/generateRandomColor';
import InputColor            from '../components/InputColor/InputColor';

const {Panel} = Collapse;

export async function getStaticProps(context) {
  return {
    props: {
      colors: Array.from(Array(7), () => [generateRandomColor(), generateRandomColor(), Math.random()])
    },
  }
}

export default function Home({colors}) {
  const [qrCodeName, setQrCodeNAme] = useState('');
  const [colorList, setColorList] = useState(colors || []);
  const [activeColorItem, setActiveColorItem] = useState(0);

  const onClickColorItem = (i) => {
    setActiveColorItem(i);
  };

  const onChangeQrCodeName = (e) => {
    setQrCodeNAme(e.target.value);
  };

  const onChangeColor = (color, colorItemIndex) => {
    const updatedColorList = colorList
      .map((item, i) => {
        if (i === activeColorItem) {
          item[colorItemIndex] = color;
          return item;
        }

        return item;
      });

    setColorList(updatedColorList);
  };

  const onClickReverseColors = () => {
    const updatedColorList = colorList
      .map((item, i) => {
        if (i === activeColorItem) {
          return [...item.slice(0, 2).reverse(), item[2]];
        }

        return item;
      });

    setColorList(updatedColorList);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Fulcrum</title>
        <meta name="description" content="Fulcrum"/>
      </Head>

      <div className={styles.header}>
        <a href="#">
          <Image src={logo} alt="QR Code" width={150} height={28}/>
        </a>
      </div>

      <main>
        <section>
          <div className={styles.sectionHeader}>
            <h2 className={styles.title}>2. Add content to the PDF QR Code</h2>
            <Tooltip title="coming soon">
              <div className={styles.helpBtn}>
                <Image src={QuestionIcon} alt="?" width={21} height={21}/>
                Help
              </div>
            </Tooltip>
          </div>

          <div className={cls(styles.wrapper, styles.wrapperQRCodeName)}>
            <h3 className={styles.subTitle}>Name your QR code*</h3>
            <Input
              onChange={onChangeQrCodeName}
              value={qrCodeName}
              placeholder="e.g. My QR code"
            />
          </div>

          <div className={cls(styles.wrapper, styles.wrapperColors)}>
            <Collapse
              bordered={false}
              defaultActiveKey={['1']}
              ghost
              expandIconPosition={'end'}
              expandIcon={({isActive}) =>
                <div>
                  <Image
                    className={cls(styles.arrowIcon, {[styles.arrowIconRotate]: !isActive})}
                    src={arrow}
                    alt={!isActive ? 'open' : 'hide'}
                    width={15}
                    height={9}
                  />
                </div>
              }
              className="accordeon"
            >
              <Panel header={
                <header className={styles.accordeonHeader}>
                  <h3 className={cls(styles.subTitle, styles.subTitleColor)}>Design & Customize</h3>
                  <p className={styles.colorDesc}>Choose your color scheme</p>
                </header>
              } key="1">
                <div className={styles.contentWrapper}>
                  <div className={styles.colorListWrapper}>
                    {colorList.map((item, i) => (
                      <div
                        className={cls(styles.item, {[styles.activeColorItem]: activeColorItem === i})}
                        key={item[2]}
                        onClick={() => onClickColorItem(i)}
                      >
                        <style jsx>{`
                          .bg-color-top {
                            background: ${item[0]};
                          }
                          .bg-color-bottom {
                            background: ${item[1]};
                          }
                        `}</style>
                        <span className={cls(styles.previewColor, 'bg-color-top')}></span>
                        <span className={cls(styles.previewColor, 'bg-color-bottom')}></span>
                      </div>
                    ))}
                  </div>

                  <div className={styles.inputColorsWrapper}>
                    <div className={styles.colorWrapperItem}>
                      <h4 className={styles.inputColorLabel}>Primary Color</h4>
                      <InputColor
                        onChange={(color) => onChangeColor(color, 0)}
                        color={colorList[activeColorItem]?.[0] || ''}
                      />
                    </div>

                    <div className={styles.updateIcon}>
                      <Image
                        src={arrowUpdate}
                        alt="Update"
                        width={24}
                        height={24}
                        onClick={onClickReverseColors}
                      />
                    </div>

                    <div className={styles.colorWrapperItem}>
                      <h4 className={styles.inputColorLabel}>Secondary Color</h4>
                      <InputColor
                        onChange={(color) => onChangeColor(color, 1)}
                        color={colorList[activeColorItem]?.[1] || ''}
                      />
                    </div>

                  </div>
                </div>
              </Panel>
            </Collapse>
          </div>

        </section>
      </main>
    </div>
  );
}


