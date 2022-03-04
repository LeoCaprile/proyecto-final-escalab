import { firestore } from '../firebase/firebase.utils';
import { setDoc,doc,getDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';


export default function useGetUserFavorites (){
    const {currentUser} = useAuth()

    const getFavorites = async () =>{
      if(currentUser != null){
        const userFavoritesRef = doc(firestore, 'users', currentUser.uid);
        const userDoc = await getDoc(userFavoritesRef);
        if(userDoc.exists()){
          const { favorites } =  userDoc.data();
          return favorites;
        }else {
          await setDoc(doc(firestore,'users',currentUser.uid),{
            favorites:[],
          }); 
        }
      }

      
}
  return getFavorites;
}
