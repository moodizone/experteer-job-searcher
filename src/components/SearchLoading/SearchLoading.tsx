import * as React from 'react';

import styles from './styles.module.scss'

const SearchLoading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.item}/>
      <div className={styles.item}/>
      <div className={styles.item}/>
      <div className={styles.item}/>
    </div>
  );
};

export default SearchLoading;
