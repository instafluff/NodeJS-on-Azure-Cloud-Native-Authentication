import fetch from "node-fetch";
import * as Web from "webwebweb";

let jobs = [];
async function getLatestJobs() {
    jobs = await fetch( "https://jobs.github.com/positions.json" )
                .then( r => r.json() );
}
getLatestJobs();

setInterval( () => {
    getLatestJobs();
}, 60000 * 15 );

Web.APIs[ "/search" ] = ( qs, body, opts ) => {
    if( qs.text ) {
        let terms = qs.text.split( "," );
        return jobs.filter( x => terms.every( term => x.description.match( new RegExp( term, "i" ) ) ) );
    }
    else {
        return jobs;
    }
};
Web.Run( 8081 );
