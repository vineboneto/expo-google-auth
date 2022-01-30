## Autenticação Google

- Estudo de como realizar login social `google` utilizando expo

### Suporte

- [x] Android
- [ ] iOS

### Requisitos

- NODEJS [Link aqui](https://nodejs.org/en/download/)
- JavaSDK
- bundletool [Link aqui](https://github.com/google/bundletool/releases)
- Expo instalado [Link aqui](https://docs.expo.dev/get-started/installation/)
- Logado em sua conta expo [Link aqui](https://docs.expo.dev/workflow/expo-cli/#auth)

### Variáveis de ambiente

- Para configurar as variáveis de ambiente será necessário criar as credencias de client auth na `google`,
  recomendo fortemente seguir a documentação presente no site da expo [aqui](https://docs.expo.dev/guides/authentication/#google), a descrição das mesmas se encontra abaixa de acordo com a documentação proposta no site
- Preste atenção no arquivo `app.json`, possui informações importantes a respeito de build, é essencial configurar o `scheme` e `slug` para definir a variável de ambiente `EXPO_REDIRECT_URI`
- A `redirect_uri`, é encarregado de retornar para o app após realizar a autenticação com o google
- A `redirect_uri` utiliza de valores diferentes de acordo com o ambiente que está sendo executado, por exemplo, se você está executando o app com expo a `redirect_uri` possuíra um valor diferente de um app já instalado em um `android` ou `ios`.
- Para o ambiente que o app será instalado é necessário configurações nas pastas `android` e `ios`, neste projeto já está configurado uma `redirect_uri` chamada `com.temp://`, porém você pode realizar está configuração com [uri-scheme](https://www.npmjs.com/package/uri-scheme), executando `npx uri-scheme list` para listar todas as uri do projeto e `npx uri-scheme add <your_uri>` para adicionar uma nova uri, está biblioteca se encarregará de realizar as configurações necessárias nas pastas `android` e `ios`, caso queira saber mais informações pode consultar esta [documentação](https://github.com/expo/expo/tree/main/packages/expo-auth-session#configuration)

```shell
# Representa o expoClientId
EXPO_ID=
# Representa o androidClientId
EXPO_ANDROID_ID=
# Representa a URL de redirect no modo develop com expo client, segue abaixo exemplo
EXPO_REDIRECT_URI=https://auth.expo.io/@your-username-expo-account/yout-slug-expo-project
# Representa a URL de redirect quando o app estiver instalado em um android ou ios
EXPO_REDIRECT_URI_PRODUCT=com.temp://
```

### Instalação Develop

```shell
# Instalar dependências
$ yarn

# Executar com expo client
$ expo start

```

### Produção

```shell
# Instalar dependências
$ yarn

# Para gerar o build será necessário instalar o eas
$ npx install -g eas

# Depois o build pode ser gerado através do comando
$ yarn build:android
# Após gerado, você poderá realizar download através de um link de um arquivo .aab

# Esse arquivo poderá ser convertido para um arquivo .apks através do bundletool
# É importante executar este comando com o java devidamente configurado nas variáveis de ambiente do seu sistema
# E com o arquivo bundletoo.jar e o arquivo .aab gerado através do build no mesmo diretório
java -jar bundletool.jar build-apks --bundle=my-app.aab --output=my_app.apks --mode=universal

# Tendo o arquivo .apks, você pode transforma-lo em um arquivo .zip manualmente, apenas renomeando-o.
# E então realizar a extração dos arquivos dentro desse .zip criado, dentro conterá um arquivo .apk.
# E com esse arquivo você poderá realizar a instalação em seu dispositivo android


```
