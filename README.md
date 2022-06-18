# Eat-well

<h2>Installation de base de données</h2>
<ol>
<li>Réinitialiser le mot de passe de base de données</li>
  <p> 
    Taper les codes suivants sur workbench :
  </p>
  <p> 
    
    ALTER USER 'root'@'localhost' IDENTIFIED BY ''; 
    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';
    
  </p>
  <li>Importer la BDD dans le répertoire suivant: <b>autre/bd/eat_well.sql</b></li> 
</ol>
