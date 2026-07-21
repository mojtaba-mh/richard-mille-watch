import React, {useEffect, useRef} from 'react';
import styles from './hero.module.css';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import Products from '../Products/products';
import productStyle from '../Products/products.module.css';
import footerStyles from '../Footer/footer.module.css'
import { heriTagData } from '../heritage/heritage';
import { footerLinks } from '../Footer/footer';

const Hero = () =>{
    gsap.registerPlugin(ScrollTrigger);
    const containerRef= useRef(null);
    const watchRef = useRef(null);
    const heroTextRef = useRef(null);
    const featureTextsRef = useRef([]);
    const productsRef = useRef(null);
    const heritageContainerRef = useRef(null);
    const heritageImageRef = useRef([]);
    const heritageTextRef = useRef([]);
    const footerRef = useRef(null);
    const logoRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const heroText = heroTextRef.current;
        const watch = watchRef.current;
        const mm = gsap.matchMedia();

        const createTimeline = (isDesktop) => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    end: "+=600%",
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                }
            });

            if (isDesktop) {
                tl.to(heroText, { opacity: 0, y: -50, duration: 1, ease: "power2.inOut" });
                tl.to(watch, { x: "-45vw", scaleX: -1, duration: 2.5, ease: "power2.inOut" }, "-=0.2");
            } else {
                
                tl.to(heroText, { opacity: 0, y: -50, duration: 1, ease: "power2.inOut" });
                tl.to(watch, { y: "-40vh", scaleX: -1, duration: 2.5, ease: "power2.inOut" });
            }

            featureTextsRef.current.forEach((textElement, index) => {
                tl.fromTo(textElement,
                    { opacity: 0, x: isDesktop ? 100 : 0, y: isDesktop ? 0 : 20 },
                    { opacity: 1, x: 0, y: 0, duration: 1.5, ease: "power2.inOut" }, 
                    "-=0.5"
                );
                if (index !== featureTextsRef.current.length - 1) {
                    tl.to(textElement, { opacity: 0, y: -50, duration: 1, delay: 1 });
                }
            });

            tl.to(featureTextsRef.current[featureTextsRef.current.length - 1], { opacity: 0, scale: 0.8, duration: 1 });
            tl.to(watchRef.current, { opacity: 0, scale: 0.5, duration: 1 }, "-=0.5");
            tl.to(productsRef.current, { opacity: 1, visibility: 'visible', duration: 1.5, ease: "power2.inOut" }, "-=0.5");
            tl.fromTo(`${productStyle.productCard}`,
                { scale: 0, opacity: 0, z: -1000 },
                { scale: 1, opacity: 1, z: 0, duration: 2, stagger: 0.2, ease: "power2.out" }, "-=1"
            );
            tl.to(productsRef.current, { opacity: 0, y: -50, duration: 1, delay: 1 });
            tl.to(heritageContainerRef.current, { opacity: 1, visibility: 'visible', duration: 1 });
            tl.fromTo(heritageImageRef.current[0], { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1.5 });
            tl.fromTo(heritageTextRef.current[0], { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.5 }, "-=1");

            heriTagData.slice(1).forEach((_, index) => {
                tl.to(heritageImageRef.current, { opacity: 0 });
                const imgIdx = index + 1;
                tl.fromTo(heritageImageRef.current[imgIdx], { y: "100%", opacity: 0 }, { y: "0%", opacity: 1, duration: 2 });
                tl.to(heritageTextRef.current[index], { opacity: 0, y: -50, duration: 1 }, "-=1");
                tl.fromTo(heritageTextRef.current[imgIdx], { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.5 }, "-=0.5");
            });
            tl.to(heritageImageRef.current, { opacity: 0 });
            tl.to(heritageTextRef.current, { opacity: 0, y: -50, duration: 1, delay: 1 });
            tl.fromTo(footerRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: "power4.out" });
            return tl;
        };

        mm.add("(min-width: 768px)", () => createTimeline(true));
        mm.add("(max-width: 767px)", () => createTimeline(false));

        return () => {
            mm.revert();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    const  addToRef = (el)=>{
        if (el && !featureTextsRef.current.includes(el)){
            featureTextsRef.current.push(el);
        }
    };
    return(
        <section className={styles.mainContainer} ref={containerRef}>
            <motion.div className={styles.heroOverlay} ref={heroTextRef}>
                <h1 className={styles.title}>Masterpiece <br/> <span className={styles.goldText}>of Time</span></h1>
                <p className={styles.subtitle}>Experience the pinnacle of Swiss engineering.</p>
                <motion.button
                    className={styles.ctaButton}
                    whileHover={{scale:1.05,
                        boxShadow:"0 0 20px rgba(212,175,55,0.6)"
                    }}
                >Explore Collection</motion.button>
            </motion.div>
            <motion.div className={styles.watchWrapper}
                initial={{opacity: 0 , scale:0.8}}
                animate={{opacity:1, scale:1}}
                transition={{duration:1.5, ease:"easeOut"}}>
                <img ref={watchRef} src='./src/pic/richard-mille-rm011.webp' alt='Richard Mille RM011' className={styles.watchImage}/>
            </motion.div>
            <div className={styles.featuresOverlay}>
                <div className={styles.featuresCard} ref={addToRef}>
                    <h2 className={styles.cardTitle}>Titanium Case</h2>
                    <p className={styles.cardDesc}>Aerospace Grade titanium strength</p>
                </div>
                <div className={styles.featuresCard} ref={addToRef}>
                    <h2 className={styles.cardTitle}>Tourbillon</h2>
                    <p className={styles.cardDesc}>Mechanical precision perfected.</p>
                </div>
                <div className={styles.featuresCard} ref={addToRef}>
                    <h2 className={styles.cardTitle}>Sapphire Crystal</h2>
                    <p className={styles.cardDesc}>Unrivaled clarity and resistance.</p>
                </div>
            </div>
            <div ref={productsRef} style={
                {position: 'absolute', inset:0, zIndex:20,
                    opacity: 0 , visibility: 'hidden'}}>
                <Products isVisible={true}/>
            </div>
            <div className={styles.heritagWrapper} ref={heritageContainerRef} style={{
                position: 'absolute', inset:0, opacity:0, visibility: 'hidden', zIndex:30}}>
                {heriTagData.map((item, index) => (
                    <div key={item.id} className={styles.heritageLayer} style={{zIndex: index}}>
                        <div className={styles.imageContainer}>
                            <img ref={el => heritageImageRef.current[index]=el}
                            src={item.img}
                            alt={item.mainTitle}
                            className={styles.heritageImg}/>
                        </div>
                        <div className={styles.textContainer} ref={el => heritageTextRef.current[index] = el}>
                            <span className={styles.subTitle}>{item.subtitle}</span>
                            <h2 className={styles.mainTitle} dangerouslySetInnerHTML={{__html: item.mainTitle}}/>
                            <p  className={styles.description}>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.bgGlow}></div>
            <footer className={footerStyles.footer} ref={footerRef}>
                <div className={footerStyles.footerContent}>
                    <div className={styles.brandArea}>
                        <h1 className={footerStyles.logo} ref={logoRef}>RICHARD MILLE</h1>
                        <p className={footerStyles.tagline}>Excellence in Motion</p>
                    </div>
                </div>
                <div className={footerStyles.linksGrid}>
                    {footerLinks.map((group, idx) => (
                        <div key={idx} className={footerStyles.linkGroup}>
                            <h4 className={footerStyles.groupTitle}>{group.title}</h4>
                            <ul className={footerStyles.linkList}>
                                {group.items.map((item, i) => (
                                <li key={i} className={footerStyles.linkItem}>
                                    <a href={`#${item}`}>{item}</a>
                                </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className={footerStyles.bottomBar}>
                    <div className={footerStyles.copyright}>  © 2026 RICHARD MILLE MANUFACTURE. ALL RIGHTS RESERVED.</div>
                    <div className={footerStyles.socials}>  
                        <a href="#">INSTAGRAM</a>  
                        <a href="#">LINKEDIN</a>  
                        <a href="#">FACEBOOK</a>
                    </div>
                </div>
            </footer>
        </section>
    );
};

export default Hero;