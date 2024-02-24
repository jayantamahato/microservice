export const LOGGER = (TAG, key, ln) => {

    switch (key) {
        case "read":
            {
                console.log('*************************************');
                console.log(TAG);
                console.log('Error While Fetching.')
                console.log('Line: ' + ln)
                console.log('*************************************');
            }
            break;
        case "update":
            {
                console.log('*************************************');
                console.log(TAG);
                console.log('Error While Updating.')
                console.log('Line: ' + ln)
                console.log('*************************************');
            }
            break;
        case "delete":
            {
                console.log('*************************************');
                console.log(TAG);
                console.log('Error While Deleting.')
                console.log('Line: ' + ln)
                console.log('*************************************');
            }
            break;
        case "create":
            {
                console.log('*************************************');
                console.log(TAG);
                console.log('Error While Creating.')
                console.log('Line: ' + ln)
                console.log('*************************************');
            }
            break;
    }




}