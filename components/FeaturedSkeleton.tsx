// React
"use client";
import { motion } from "framer-motion";

const FeaturedSkeleton = () => {
  const skeletonVariants = {
    shimmer: {
      opacity: [0.3, 1, 0.3], // Pulse effect (fades in and out)
    },
  };

  const shimmerTransition = {
    duration: 1.5, // Smooth duration
    repeat: Infinity, // Loops forever
    ease: "easeInOut", // Smooth easing function
  };

  return (
    <div className="w-full h-3/4 bg-secondary-500 flex items-center p-4">
      <div className="w-1/2 flex flex-col gap-4">
        <motion.div
          className="w-full h-6 rounded-full bg-accent-100"
          variants={skeletonVariants}
          animate="shimmer"
          transition={shimmerTransition}
        />
        <motion.div
          className="w-3/4 h-10 rounded-full bg-accent-100"
          variants={skeletonVariants}
          animate="shimmer"
          transition={shimmerTransition}
        />
        <motion.div
          className="w-1/4 h-6 rounded-full bg-accent-100"
          variants={skeletonVariants}
          animate="shimmer"
          transition={shimmerTransition}
        />
        <motion.div
          className="w-1/3 h-6 rounded-full bg-accent-100"
          variants={skeletonVariants}
          animate="shimmer"
          transition={shimmerTransition}
        />
        <div className="flex justify-between items-center">
          <motion.div
            className="w-1/4 h-6 rounded-full bg-accent-100"
            variants={skeletonVariants}
            animate="shimmer"
            transition={shimmerTransition}
          />
          <motion.div
            className="w-1/4 h-6 rounded-full bg-accent-100"
            variants={skeletonVariants}
            animate="shimmer"
            transition={shimmerTransition}
          />
          <motion.div
            className="w-1/4 h-6 rounded-full bg-accent-100"
            variants={skeletonVariants}
            animate="shimmer"
            transition={shimmerTransition}
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturedSkeleton;
