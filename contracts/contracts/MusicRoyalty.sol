// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MusicRoyalty {
    // ============ STRUCT ============
    struct Song {
        uint id;
        string title;
        string artist;
        string genre;
        address[] collaborators;
        uint[] shares;
        uint totalPlays;
        bool isActive;
    }
    
    // ============ MAPPING ============
    mapping(uint => Song) public songs;
    mapping(uint => mapping(address => uint)) public pendingRoyalties;
    uint public songCounter;
    
    // ============ EVENT ============
    event SongRegistered(uint indexed songId, string title, address indexed owner);
    event SongPlayed(uint indexed songId, address indexed listener, uint amount);
    event RoyaltyClaimed(uint indexed songId, address indexed collaborator, uint amount);
    
    // ============ MODIFIER ============
    modifier songExists(uint _songId) {
        require(_songId > 0 && _songId <= songCounter, "Song does not exist");
        require(songs[_songId].isActive, "Song is not active");
        _;
    }
    
    modifier validShares(uint[] memory _shares) {
        uint total;
        for(uint i = 0; i < _shares.length; i++) {
            total += _shares[i];
        }
        require(total == 100, "Total shares must be 100%");
        _;
    }
    
    // ============ FUNGSI WRITE 1: REGISTER SONG ============
    function registerSong(
        string memory _title,
        string memory _artist,
        string memory _genre,
        address[] memory _collaborators,
        uint[] memory _shares
    ) external validShares(_shares) {
        require(_collaborators.length == _shares.length, "Array length mismatch");
        require(_collaborators.length > 0, "At least one collaborator");
        
        songCounter++;
        
        songs[songCounter] = Song({
            id: songCounter,
            title: _title,
            artist: _artist,
            genre: _genre,
            collaborators: _collaborators,
            shares: _shares,
            totalPlays: 0,
            isActive: true
        });
        
        emit SongRegistered(songCounter, _title, msg.sender);
    }
    
    // ============ FUNGSI WRITE 2: PLAY SONG ============
    function playSong(uint _songId) external payable songExists(_songId) {
        require(msg.value > 0, "Must send payment to play song");
        
        Song storage song = songs[_songId];
        song.totalPlays++;
        
        for(uint i = 0; i < song.collaborators.length; i++) {
            address collaborator = song.collaborators[i];
            uint share = song.shares[i];
            uint royaltyAmount = (msg.value * share) / 100;
            
            pendingRoyalties[_songId][collaborator] += royaltyAmount;
        }
        
        emit SongPlayed(_songId, msg.sender, msg.value);
    }
    
    // ============ FUNGSI WRITE 3: CLAIM ROYALTY ============
    function claimRoyalty(uint _songId) external songExists(_songId) {
        uint amount = pendingRoyalties[_songId][msg.sender];
        require(amount > 0, "No pending royalty");
        
        pendingRoyalties[_songId][msg.sender] = 0;
        payable(msg.sender).transfer(amount);
        
        emit RoyaltyClaimed(_songId, msg.sender, amount);
    }
    
    // ============ FUNGSI READ 1: GET SONG DETAILS ============
    function getSongDetails(uint _songId) external view songExists(_songId) returns (
        string memory title,
        string memory artist,
        string memory genre,
        uint totalPlays,
        address[] memory collaborators,
        uint[] memory shares
    ) {
        Song storage song = songs[_songId];
        return (
            song.title,
            song.artist,
            song.genre,
            song.totalPlays,
            song.collaborators,
            song.shares
        );
    }
    
    // ============ FUNGSI READ 2: GET ALL SONGS ============
    function getAllSongs() external view returns (Song[] memory) {
        Song[] memory allSongs = new Song[](songCounter);
        for(uint i = 1; i <= songCounter; i++) {
            allSongs[i-1] = songs[i];
        }
        return allSongs;
    }
    
    // ============ FUNGSI READ 3: GET TOTAL SONGS ============
    function getTotalSongs() external view returns (uint) {
        return songCounter;
    }
    
    receive() external payable {}
}