import React, {useEffect, useRef} from 'react';
import productStyles from './products.module.css';
import gsap from 'gsap';


const Products = ({isVisible}) =>{
    const sectionRef = useRef(null);
    const carouselRef = useRef(null);
    const cardsRef = useRef([]);

    const proudcts = [ 
        {id: 1 , name : 'RM 011', img: './pic/richard mille rm011.webp' },
        {id: 2 , name : 'RM 07', img: './src/pic/Richard-Mille-RM-07-01.webp' },
        {id: 3 , name : 'RM 050', img: './src/pic/rm65-01.webp' },
        {id: 4 , name : 'RM 067', img: './src/pic/rm67-02.webp' },
        {id: 5 , name : 'RM 035', img: './src/pic/richard_mille rm 35-02.webp' },
    ];

    const [zOffset, setZOffset] = React.useState(500);

    useEffect(()=>{
            const handleResize = () => {
            if (window.innerWidth < 480) {
                setZOffset(200); 
            } else if (window.innerWidth < 768) {
                setZOffset(300); 
            } else {
                setZOffset(500); 
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        const rotationTl = gsap.to(carouselRef.current,{
            rotateY: 360,
            duration: 25,
            repeat: -1,
            ease: "none"
        });

        const carousel = carouselRef.current;

        const pause = () => rotationTl.pause();
        const play = () => rotationTl.play();

        carousel.addEventListener('mouseenter', pause);
        carousel.addEventListener('mouseleave', play);
        carousel.addEventListener('touchstart', pause); 
        carousel.addEventListener('touchend', play);   

        return () =>{
            rotationTl.kill();
            carousel.removeEventListener('mouseenter', pause);
            carousel.removeEventListener('mouseleave', play);
            carousel.removeEventListener('touchstart', pause);
            carousel.removeEventListener('touchend', play);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return(
        <section className={productStyles.productSection} ref={sectionRef} style={{opacity: isVisible ? 1 : 0, visibility: isVisible ? 'visible' : 'hidden'}}>
            <div className={productStyles.header} >
                <h2 className={productStyles.sectionTilte}>Iconic Models</h2>
                <p className={productStyles.sectionSuntitle}>Precision in every dimension.</p>
            </div>
            <div className={productStyles.carouselViewport} >
                <div className={productStyles.carousel3D} ref={carouselRef}>
                    {proudcts.map((proudct, index)=>{
                        const angle = (index * 360) / proudcts.length;
                        return(
                            <div key={proudct.id} 
                            ref={el => cardsRef.current[index]=el}
                            className={productStyles.productCard}
                            style={{ transform: `rotateY(${angle}deg) translateZ(${zOffset}px)` }}>
                                <div className={productStyles.cardInner}>
                                    <img src={proudct.img} alt={proudct.name} className={productStyles.productImg}/>
                                    <div className={productStyles.cardInfo}>
                                        <h3 className={productStyles.cardTitle}>{proudct.name}</h3>
                                        <button className={productStyles.viewBtn}>View Detaills</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Products;