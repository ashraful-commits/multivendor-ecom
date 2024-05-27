
import { UTApi } from 'uploadthing/server';


export const imageRemove =async(imgUrl:string)=>{
    try {
        const utpApi = new UTApi()
        const parts = imgUrl.split('/');
        const key = parts[parts.length - 1];
        console.log(key)
        await utpApi.deleteFiles(key)
        return {success:true}
    } catch (error) {
        return {success:false} 
    }
}
export const MutiPleImageRemove = async (imgUrls: string[]) => {
    try {
        const utpApi = new UTApi();
        const results = [];

        for (const imgUrl of imgUrls) {
            const parts = imgUrl.split('/');
            const key = parts[parts.length - 1];
            console.log(key);
            await utpApi.deleteFiles(key);
            results.push({ success: true });
        }

        return results;
    } catch (error) {
        return imgUrls.map(() => ({ success: false }));
    }
};
