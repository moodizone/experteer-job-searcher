import * as React from 'react';

import styles from './styles.module.scss'

export const SearchLoading = () => {
  return (
    <div>
      <h1 className='text-center text-black mt-5'>Your results will appear here ...</h1>
      <div className={styles.loadingContainer}>
        <div className={styles.item}/>
        <div className={styles.item}/>
        <div className={styles.item}/>
        <div className={styles.item}/>
      </div>
    </div>
  );
};
