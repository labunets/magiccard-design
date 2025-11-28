import { motion, AnimatePresence } from 'framer-motion';
import { Box } from '@mui/material';

/**
 * PageTransition - Анимация появления новой страницы снизу вверх
 * Старая страница исчезает мгновенно
 */
const PageTransition = ({ children, pageKey }) => {
  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pageKey}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, transition: { duration: 0 } }}
          transition={{
            duration: 0.3,
            ease: 'easeOut',
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default PageTransition;
