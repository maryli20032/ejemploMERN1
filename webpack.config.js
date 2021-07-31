module.exports = {
    entry:'./src/app/index.js', //defino el lugar de donde esta el codigo reack para ser tranformado
    output:{ //defino el lugar donde se va a poner el codigo traducido
        path: __dirname + '/src/public', //primero obtengo toda la ruta hasta la carpeta mern-stack-tasks y le anexamos /src/public
        filename: 'bundle.js' //creamos un arhivo donde ira el codigo traducido 
    },
    module:{
        rules:[
            {
                test: /.js$/,
                resolve: {
                    extensions: ['.js', '.jsx']
                  },
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            
        ]
    }
};