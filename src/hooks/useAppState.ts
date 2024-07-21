import { useSelector } from 'react-redux'
import { IAppSlice } from '../redux/slice/appSlice'
import { RootState } from '../store'

const useAppState = () => {
    const appState = useSelector((state:RootState) => state.app)
    
    const loading = appState.loading
    
    return { loading }
}

export default useAppState