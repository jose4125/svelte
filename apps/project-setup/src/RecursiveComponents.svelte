<script>
  import FamilyNode from './FamilyNode.svelte';

  let familyStructure = [
    {
      isParent: true,
      name: '- chris',
      children: [
        {
          isParent: true,
          name: '-- moe',
          children: [{ isParent: false, name: '--- julie' }],
        },
      ],
    },
    { isParent: false, name: '-Anna' },
  ];
</script>

{#each familyStructure as familiMember}
  <FamilyNode member={familiMember} />
{/each}
