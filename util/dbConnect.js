module.exports = function (query, params) {

    const oracledb = require("oracledb");
    const config = require("../test/support/dbconfig.js");


    function test(query, params, config) {
        console.log('---inside DB test function-----');

        return new Promise(async function (resolve, reject) {
            let connection;

            try {
                connection = await oracledb.getConnection(config);

                const result = await connection.execute(query, params);
                resolve(result.rows);

            } catch (err) {

                reject(err);

            } finally {
                if (connection) {
                    try {
                        await connection.release();
                        console.log('---Database connection released-----')
                    } catch (e) {
                        console.error(e);
                    }
                }
            }
        });
    }

    async function run() {
        try {
            const res = await test(query, params, config);
            return res;
        } catch (err) {
            console.error(err);
        }
    }
    var myRes = run();
    console.log('---------myRes---------');
    console.log(myRes);

    return myRes;
}