
<h1>Eat-well</h1> 


<article> 
  <section>
    <h2>Table de matière </h2>
    <nav>
      <ol>
        <li><a href = "#introduction">Introduction</a></li>
        <li><a href = "#architecture">Architecture</a></li>
        <li><a href = "#installation">Installation</a></li>
        <li><a href = "#executer">Exécuter</a></li>
        <li><a href = "#contributeurs">Contributeurs -- Groupe 240 du Mastercamp</a></li>
      </ol>
    </nav>
  </section>
</article>

 <article>
  <section id="introduction">
    <h2>1. Introduction</h2>
    <div> 
      <p>
        Dans le cadre du projet universitaire du Mastercamp de 2022 en filière Data, nous avons proposé une application web qui permet aux utilisateurs de faire des recherches des bonnes recettes, saines, équilibrées et à la fois vertueuses. Ce readme vous permet de mieux comprendre l'architecture de projet, l'installation de projet, les exécutions et les bus connus ainsi des outils utilisés.
      </p>
    </div>
  </section>
</article>

<article> 
  <section id="architecture">
    <h2>2. Architecture </h2>
    <div>
      <h3>autre</h3>
      <div>
        <h4>&nbsp&nbsp&nbsp&nbspbd </h4>
        <p>&nbsp&nbsp&nbsp&nbspbd&nbsp&nbsp&nbsp&nbsp Dans ce répertoire, vous pouvez trouvez notre base de données en sql </p>
      </div>
      <div>
        <h4>&nbsp&nbsp&nbsp&nbspdiagramme </h4>
        <p>&nbsp&nbsp&nbsp&nbspbd&nbsp&nbsp&nbsp&nbsp Dans ce répertoire, vous pouvez trouvez le diagramme de cas d'utilisation, le diagramme de classe et le diagramme de séquence </p>
      </div>
      <div>
        <h4>&nbsp&nbsp&nbsp&nbspmaquettes </h4>
        <p>&nbsp&nbsp&nbsp&nbspbd&nbsp&nbsp&nbsp&nbsp Dans ce répertoire, vous pouvez trouvez les maquettes de notre application web </p>
      </div>
    </div>
    <div>
      <h3>bin</h3>
      <p>Dans ce répertoiren, on a fichier www, ce fichier contient des informations de configuration sur le serveur</p>
    </div>
    <div>
      <h3>client</h3>
      <p>Nous stockons le code et la documentation sur le front-end dans ce fichier</p>
    </div>
    <div>
      <h3>IA</h3>
      <p>Nous stockons les documents pertinents sur l'IA dans ce répertoire</p>
    </div>
    <div>
      <h3>node_modules</h3>
      <p>Nous stockons la bibliothèque sur nos projets dans ce dossier</p>
    </div>
    <div>
      <h3>server</h3>
      <p>Nous stockons la bibliothèque sur nos projets dans ce dossier</p>
    </div>
    <div>
      <h3>les autres fichiers</h3>
      <div>
        <h4>&nbsp&nbsp&nbsp&nbsppackage-lock.json</h4>
        <p>Nous stockons l'utilisation de la bibliothèque dans ce fichier</p>
      </div>
      <div>
        <h4>&nbsp&nbsp&nbsp&nbsppackage.json</h4>
        <p>Ce fichier stocke la méta donnée de notre projet</p>
      </div>
    </div>
  </section>
</article>


<article id="installation"> 
  <section>
    <h2>3. Installation </h2>
    <div>
      <h3>Base de données </h3>
      <ol>
        <li>Réinitialiser le mot de passe de base de données</li>
          <p> 
            Taper les codes suivants sur workbench :
          </p>
          <pre>
            <code>
              ALTER USER 'root'@'localhost' IDENTIFIED BY ''; 
              ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';
            </code>
          </pre>
        <li>Importer la BDD dans le répertoire suivant: <b>autre/bd/eat_well.sql</b></li> 
      </ol>
    </div>
    <div>
      <h3>Environnement de travail</h3>
      <ol>
        <li>Nodejs</li>
            <ol>
                <li>Si vous n'avez pas Node.js, veilleuez installer le serveur node.JS à travers le site officiel de Node.Js : https://nodejs.org/en/download/</li>
                <li>Après l’installation de node.js, ouvrez l’invite de commande et taper la commande d’installation de Vue CLI suivante:
                    <pre>
                        <code>npm install -g @vue/cli</code>
                    </pre>
                </li>
            </ol>
        <li>Boostrap 3</li> 
        <p>Pour utiliser la vue de boostrap, veilleuez télécharger via la commande suivante:</p>
        <pre>
          <code>
            npm i --save bootstrap bootstrap-vue-3
          </code>
        </pre>
        <li>node_modules</li> 
        <p>Il faudrait télécharger télécharger le fichier node_modules.zip sur notre github et le dézipper à travers le lien : https://github.com/AN-Xiang-yu/Eat-well</p>
      </ol>
    </div>
  </section>
</article>


<article> 
  <section id="executer">
    <h2>4. Exécuter </h2>
    <p>Une fois que tous sont prêts, vous pouvez aller au répertoire de ce projet et taper la commande suivante pour lancer notre projet</p>
    <pre>
        <code>nodemon</code>
    </pre>
  </section>
</article>


<article> 
  <section id="contributeurs">
    <h2>5. Contributeurs -- Groupe 240 du Mastercamp </h2>
    <div> 
      <p>AN, Xiangyu  </p>
      <p>BENAMAR, Essaid </p>
      <p>NDACLEU ANDJONGO, Laure </p>
      <p>OUALLI, Rayan</p>
    </div>
  </section>
</article>




