import { motion, AnimatePresence } from "framer-motion";




const AnimateTogggle = ({children, toggleClass, show}) => {



	return (

			<AnimatePresence>
			{show && 
            <motion.div  className={`${toggleClass}`}

            initial={{opacity: 0, y: 20,}} 
            animate={{opacity: 1, y: 0, transition:{duration: 0.5}}}
            exit={{ opacity: 0, y: -50,transition:{duration: 0.5} }}

            >
          
           	{children}
                      
             </motion.div>
             }
			</AnimatePresence>

		)
}

export default AnimateTogggle