import styles from './LoadingLine.module.css'

export const LoadingLine = () => {
  return (
    <div className={styles.loadingLine}>
      <div className={styles.line}>
        <div className={styles.shadow}/>
      </div>
    </div>
  )
}
