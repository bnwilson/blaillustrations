import { FourOhFour } from "@/components/ErrorMessages";

/** **Custom404**
 * 
 * Reroutes invalid endpoints back to root (home)
 * 
 * * _See: `./next.config.js` for config info_
 * 
 * @returns {void}
 */
export const Custom404 = () => <><FourOhFour/></>

export const getServerSideProps = () => {
    return { redirect: { destination: "/", permanent: false } }; 
};

export default Custom404;