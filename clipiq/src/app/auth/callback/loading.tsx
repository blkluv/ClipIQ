// import {Spinner} from '@componenets/global/loader/spinner'

const AuthLoading = () => {
    return (
        <div className="flex h-screen w-full items-center justify-center">
        {/* <Spinner /> */}
        loading...
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
    )
    }
export default AuthLoading;